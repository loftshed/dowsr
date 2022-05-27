const getUser = async (by, value) => {
  try {
    let response;
    by === 'email'
      ? (response = await fetch(`https://dowsr.herokuapp.com/api/get-user?email=${value}`))
      : (response = await fetch(`https://dowsr.herokuapp.com/api/get-user?id=${value}`));
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.log(error);
  }
};

// this is redundant with the above function, but I'm leaving it here for now
const getUserByUsername = async (username) => {
  try {
    const response = await fetch(`https://dowsr.herokuapp.com/api/get-user/${username}`);
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.log(error);
  }
};

//TODO: turn add/modify user into a single function that switches purpose with an argument..
const addNewUser = async ({ target }, user) => {
  try {
    const response = await fetch('https://dowsr.herokuapp.com/api/add-user', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
        givenName: target.firstName.value,
        middleInitial: target.middleName.value,
        familyName: target.lastName.value,
        username: target.username.value,
        birthdate: target.birthdate.value,
        gender: target.gender.value,
        city: target.city.value,
        country: target.country.value,
        region: target.region.value,
        avatarUrl: user.picture,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

const modifyUser = async ({ target }) => {
  try {
    const response = await fetch(
      `https://dowsr.herokuapp.com/api/modify-user?email=${target.email.value}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          givenName: target.firstName.value,
          middleInitial: target.middleName.value,
          familyName: target.lastName.value,
          birthdate: target.birthdate.value,
          gender: target.gender.value,
          city: target.city.value,
          country: target.country.value,
          region: target.region.value,
        }),
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export { getUser, getUserByUsername, addNewUser, modifyUser };
