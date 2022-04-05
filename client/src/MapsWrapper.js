const { react_app_google_api_key } = process.env;

const MapsWrapper = () => {
  return (
    <>
      <Wrapper apiKey={react_app_google_api_key}>
        <HomeScreen />
      </Wrapper>
    </>
  );
};

export default MapsWrapper;
