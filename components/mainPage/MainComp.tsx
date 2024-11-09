import { Main } from "./Main";
import { Suspense } from "react";

export function MainComp() {
    return (
        <Suspense fallback={
            <div>
                Loading...
            </div>
        }>
            <Main />
        </Suspense>
    )
}