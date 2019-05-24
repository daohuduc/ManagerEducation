import React, { Suspense } from 'react';
import styles from './styles.css';
import { Header } from '../../components/Header';
import { VerticalMenuAdmin } from '../../components/Menu/VerticalMenuAdmin';
import routes from '../../../routes';
import { Route } from 'react-router-dom';
import { Breadcumbs } from '../../components/Breadcumbs';

const PageWrapperAdmin = () => {
    return (
        <React.Fragment>
            <Header />
            <Breadcumbs />
            <div className={`${styles.main} container-fluid`}>
                <div className="row">
                    <div className="col-lg-3 col-md-2">
                        <VerticalMenuAdmin />
                    </div>
                    <div className="col-lg-9 col-md-10">
                        <div style={{ marginTop: 0 }}>
                            <Suspense fallback={<div>Loading...</div>}>
                                {
                                    routes.map(route => (
                                        <Route key={route.path} {...route} />
                                    ))
                                }
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
export default PageWrapperAdmin;
