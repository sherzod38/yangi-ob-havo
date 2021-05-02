const SingleCityPage = ({match}) => {
  return (
    <h1>Hello from {match.params.cityName}</h1>
  )
}

export default SingleCityPage;