
import { pipe, hasProperty,isObject, set, get, Path } from './internals'

const $$path = Symbol("Path For Magic Lens")


export const setter = <T, U>(getter: (t: T) => U) => {
    let writes = pipe(
        TRACEABLE as T,
        getter,
        deepEntries   
    )

    return (selected: U, destination: T) => 
        writes.reduce(
                (d, [selectedPath, unselectedWrite]) => 
                    isObject(unselectedWrite) && hasProperty(unselectedWrite, $$path)
                        ? set(
                            d,
                            unselectedWrite[$$path] as Path<T>,
                            get(selected, selectedPath)
                        ) as T
                        : d
                ,
            destination
        )
}



export const pathOnGet = <O extends { [$$path]?: PropertyKey[] }>(o: O): any => new Proxy(o, {
    get: (_,p) => 
        p === $$path
            ? (o[$$path] || [])
            : pathOnGet({
                [$$path]: (o[$$path] || [])
                .concat(
                    typeof p === 'string' && p !== "" && !Number.isNaN(Number(p))
                        ? Number(p)
                        : p
                )
            })
    
})


export const TRACEABLE = pathOnGet({})


export const deepEntries = <T, P extends Path<any>>(x: T, parentPath ?: P): DeepEntries<T,P> => 
    !isObject(x) || hasProperty(x, $$path)
        ? [tuple(parentPath || [], x)]
        : (Array.isArray(x)
            ? [...x.entries()] as [PropertyKey, unknown][]
            : Object.entries(x)
         ).flatMap(
             ([k, v]) => 
                deepEntries(v)
                .map(([s, d]) => tuple([...(parentPath || []), k, ...s], d))

         )   

type DeepEntries<T, P extends Path<any>> = [PropertyKey[], unknown][]

const tuple = <T extends any[]>(...xs: T) => xs
