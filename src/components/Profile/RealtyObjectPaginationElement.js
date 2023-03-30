

const RealtyObjectPaginationElement = ({ realties, loading }) => {
    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <ul className='list-group mb-4'>
            {realties.map(realty => (
                <li key={realty.id} className='list-group-item'>
                    {realty.address}
                </li>
            ))}
        </ul>
    );
};
export default RealtyObjectPaginationElement