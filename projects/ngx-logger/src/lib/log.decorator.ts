/* tslint:disable:ban-types only-arrow-functions */

import { TracingService } from "./tracing.service";

export function Log() {
    return (target: Function) => {

        Object.getOwnPropertyNames(target.prototype).forEach(property => {
            const descriptor: PropertyDescriptor = Object.getOwnPropertyDescriptor(target.prototype, property);
            if (descriptor) {
                const originalMethod: any = descriptor.value;
                if (originalMethod instanceof Function) {

                    descriptor.value = function(...args: any[]) {
                        TracingService.logger.trace(`Method '${target.name}#${property}' start`);
                        const methodInvocationResult = originalMethod.apply(this, args);
                        TracingService.logger.trace(`Method '${target.name}#${property}' end`);
                        return methodInvocationResult;
                    };
                    Object.defineProperty(target.prototype, property, descriptor);
                }
            }
        });

    };
}
