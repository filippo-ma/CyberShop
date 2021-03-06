import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { listProducts } from '../actions/productActions'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'




const HomeScreen = () => {
    const params = useParams()

    const keyword = params.keyword
    const pageNumber = params.pageNumber || 1
    

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productList
    
    useEffect(() => {
       dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    

    return (
        <>
        <Meta title='Welcome to CyberShop | Home'/>
        {!keyword ? <ProductCarousel/> : <Link to='/' className='btn btn-light'>Go Back</Link>}
            <h1 className='py-3'>All Products</h1>
            {loading ? (<Loader/>) : error ? (<Message variant='danger'>{error}</Message>) : (
                <>
                <Row>
                    {products.map(product => (
                        <Col className='homeprod' key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product}/>
                        </Col> 
                    ))}
                </Row>  
                <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}/>
                </>
            )}
         
        </>
    )
}

export default HomeScreen
