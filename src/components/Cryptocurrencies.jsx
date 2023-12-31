import React, {useEffect, useState} from "react";
import {useGetCryptosQuery} from "../utils/cryptoApi";
import {Card, Col, Input, Row} from "antd";
import {Link} from "react-router-dom";
import millify from "millify";
import '../styles/Cryptocurrencies.css'


const Cryptocurrencies = ({simplified}) => {
    const count = simplified ? 10 : 100;
    const {data: cryptosList, isFetching} = useGetCryptosQuery(count)
    const [cryptos, setCryptos] = useState([])
    const [search, setSearch] = useState('')


    useEffect(() => {
        setCryptos(cryptosList?.data?.coins)

        const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()))

        setCryptos(filteredData)

    }, [cryptosList, search])

    console.log(cryptos)
    if (isFetching) return 'Loading...';
    return (
        <>
            <div className='search-crypto'>
                <Input placeholder='Search Cryptocurrency' onChange={(e) => setSearch(e.target.value)}/>
            </div>
            <Row gutter={[32, 32]}  className='crypto-card-container'>
                {cryptos?.map((currency) => (
                    <Col key={currency.uuid} xs={24} sm={16} lg={6} className='crypto-card'>
                        <Link to={`/crypto/${currency.uuid}`}>
                            <Card hoverable className='card' title={`${currency.rank}, ${currency.name}`}
                                  extra={<img  className='crypto-image' src={currency.iconUrl} />}
                                  hoverable
                            >
                                <p>Price: {millify(currency.price)}</p>
                                <p>Market Cap: {millify(currency.marketCap)}</p>
                                <p>Daily Change: {millify(currency.change)}</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>

        </>
    )
}

export default Cryptocurrencies