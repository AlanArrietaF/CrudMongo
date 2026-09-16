const reponse = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  console.log(reponse);
  const json = await reponse.json();