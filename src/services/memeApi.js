export const postMeme = image => {
  return fetch('http://ec2-3-17-9-198.us-east-2.compute.amazonaws.com:5000/api/v1/memes/', {
    method: 'POST',
    body: JSON.stringify(image),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(([ok, json]) => {
      if(!ok) throw 'Could not post meme to database!';
      return console.log('Success!', json);
    });
};
