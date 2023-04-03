function handleInput(input, setInput) {
  const { id, value } = input.target;

  setInput((prevState) => ({
    ...prevState,
    [id]: value,
  }));
}

export default handleInput;
