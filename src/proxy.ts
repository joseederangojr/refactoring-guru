export type Identifiable<TData = any> = {
  id: string;
} & TData;

export interface Table<TData = any> {
  insert(data: TData): Identifiable<TData>;
  select(): Identifiable<TData>[];
  select(id: string): Identifiable<TData> | undefined;
  update(id: string, data: Partial<TData>): Identifiable<TData> | undefined;
  delete(id: string): void;
}

export interface DataSource {
  insert<TData>(table: string, data: TData): Identifiable<TData>;
  select<TData>(table: string): Identifiable<TData>[];
  select<TData>(table: string, id: string): Identifiable<TData> | undefined;
  update<TData>(
    table: string,
    id: string,
    data: Partial<TData>,
  ): Identifiable<TData> | undefined;
  delete(table: string, id: string): void;
}

export interface TableCache<TData> extends Table<TData> {}

abstract class MapTable<TData> implements Table<TData> {
  constructor(private data: Map<string, Identifiable<TData>>) {}
  select(): Identifiable<TData>[];
  select(id: string): Identifiable<TData> | undefined;
  select(id?: string): Identifiable<TData>[] | Identifiable<TData> | undefined {
    if (id === undefined) {
      return Array.from(this.data.values());
    }
    return this.data.get(id);
  }

  insert(data: TData): Identifiable<TData> {
    const id = (this.data.size + 1).toString();
    const identifiableTData = { id, ...data };
    this.data.set(id, identifiableTData);

    return identifiableTData;
  }

  update(id: string, data: Partial<TData>): Identifiable<TData> | undefined {
    const current = this.data.get(id);
    if (!current) {
      return current;
    }

    const newState = { ...current, ...data };
    this.data.set(id, newState);

    return newState;
  }

  delete(id: string): void {
    if (this.data.has(id)) {
      this.data.delete(id);
    }
  }
}

export abstract class MapCache<TData> implements TableCache<TData> {
  constructor(
    private table: Table<TData>,
    private cache: Map<string, Identifiable<TData> | Identifiable<TData>[]>,
  ) {}
  select(): Identifiable<TData>[];
  select(id: string): Identifiable<TData> | undefined;
  select(id?: string): Identifiable<TData>[] | Identifiable<TData> | undefined {
    const key = id ?? "all";
    const data = this.cache.get(key);

    if (data) {
      return data;
    }

    if (!id) {
      const data = this.table.select();
      if (data.length) {
        this.cache.set("all", data);
      }

      return data;
    }

    if (id) {
      const data = this.table.select(id);

      if (data) {
        this.cache.set(id, data);
      }
      return data;
    }

    return undefined;
  }

  insert(data: TData): Identifiable<TData> {
    this.cache.delete("all");
    return this.table.insert(data);
  }

  update(id: string, data: Partial<TData>): Identifiable<TData> | undefined {
    this.cache.delete(id);
    this.cache.delete("all");
    return this.table.update(id, data);
  }

  delete(id: string): void {
    return this.table.delete(id);
  }
}

export interface User {
  name: string;
  email: string;
  age: number;
}

export class UserTable extends MapTable<User> {}

export class UserCacheTable extends MapCache<User> {}

export class TableNotFound extends Error {}

export class MapDataSource implements DataSource {
  constructor(private tables: Map<string, Table>) {}

  private getTable<TData>(table: string): Table<TData> {
    const t = this.tables.get(table);
    if (!t) throw new TableNotFound();
    return t;
  }

  select<TData>(table: string): Identifiable<TData>[];
  select<TData>(table: string, id: string): Identifiable<TData> | undefined;
  select<TData>(
    table: string,
    id?: string,
  ): Identifiable<TData>[] | Identifiable<TData> | undefined {
    const t = this.getTable<TData>(table);
    if (!id) {
      return t.select();
    }
    return t.select(id);
  }

  insert<TData>(table: string, data: TData): Identifiable<TData> {
    const t = this.getTable<TData>(table);
    return t.insert(data);
  }

  update<TData>(
    table: string,
    id: string,
    data: Partial<TData>,
  ): Identifiable<TData> | undefined {
    const t = this.getTable<TData>(table);

    return t.update(id, data);
  }

  delete<TData>(table: string, id: string): void {
    const t = this.getTable<TData>(table);

    return t.delete(id);
  }
}
