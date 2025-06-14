import { BrowserRouter, Route, Routes } from "react-router-dom";

const AppRouter = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/auth'>
                        <Route path='/login'/>
                    </Route>
                    <Route path='/admin'>
                        <Route path='/products-management'/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default AppRouter;