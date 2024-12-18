import { Suspense } from "react";
import ErrorBoundary from "./error-boundary";
import { Skeleton } from "@src/components/ui/skeleton";

export function withFallbackAndBoundary({
    Component,
    loadingFallback,
    errorFallback,
    resetErrorBoundary,
    className='',
    ...props
}) {
    console.log('class',className,'props',props,'inside here!')
    console.log(Component)
    return function WrappedComponent() {
        return (
            <ErrorBoundary fallback={ errorFallback } {...{resetErrorBoundary}} >
                <Suspense fallback={ loadingFallback || <DefaultLoadingFallback {...{className, ...props}} /> }>
                    <Component {...{className, ...props}} />
                </Suspense>
            </ErrorBoundary>
        );
    };
}

const DefaultLoadingFallback = ({className='', ...props}) => {
    console.log(props)
    return <Skeleton className={`m-4 ${className} h-32`}  {...props} />
};