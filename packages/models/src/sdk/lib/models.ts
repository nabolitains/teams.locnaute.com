import type { ModelClass } from './ModelClass';

const models = new Map<string, ModelClass<any>>();

function callModel(model: string, method: string, data: any[]): any {
	// @ts-ignore
	return models.get(model)[method](...data);
}

function handler<T extends object>(namespace: string): ProxyHandler<T> {
	return {
		get:
			(_target: T, prop: string): any =>
			(...params: any[]): any =>
				callModel(namespace, prop, params),
	};
}

export function registerModel(name: string, instance: ModelClass<any>): void {
	models.set(name, instance);
}

export function proxify<T>(namespace: string): T {
	return new Proxy({}, handler(namespace)) as unknown as T;
}