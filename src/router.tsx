import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginView from './views/login';
import Register
 from './views/register';
import AuthLayout from './layouts/Authlayout';
import AppLayout from './layouts/AppLayout';
import LinkTreeView from './views/LinkTreeView';
import ProfileView from './views/ProfileView';
import HandleView from './views/HandleView';
import NotFoundView from './views/404NotFound';
import HomeView from './views/HomeView';
export default function Router () {
    
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<AuthLayout/>}>
                        <Route path='/auth/login' element={<LoginView />} />
                        <Route path='/auth/register' element={<Register />} />
                    </Route>

                    <Route path='/admin' element={<AppLayout/>}>
                        <Route index={true} element={<LinkTreeView/>}/>
                        <Route path='profile' element={<ProfileView/>}/>
                    </Route>

                    <Route path='/:handle' element={<AuthLayout/>}>
                        <Route element={<HandleView />} index={true} />
                    </Route>

                    <Route path='/' element={<HomeView />}/>

                    <Route path='/404' element={<AuthLayout />}>
                        <Route element={<NotFoundView />} index={true}/>
                    </Route>

                    
                </Routes>
            </BrowserRouter>
        </>
    )
}