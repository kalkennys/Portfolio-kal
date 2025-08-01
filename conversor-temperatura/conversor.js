function convert() {
  const temp = parseFloat(document.getElementById('temp').value);
  const from = document.getElementById('from').value;
  const to = document.getElementById('to').value;
  const resultDiv = document.getElementById('result');

  if (isNaN(temp)) {
    resultDiv.textContent = 'Por favor, insira um número válido.';
    return;
  }

  let result;

  // Primeiro converte para Celsius
  let celsius;
  if (from === 'celsius') celsius = temp;
  else if (from === 'fahrenheit') celsius = (temp - 32) * 5 / 9;
  else if (from === 'kelvin') celsius = temp - 273.15;

  // Depois converte de Celsius para destino
  if (to === 'celsius') result = celsius;
  else if (to === 'fahrenheit') result = (celsius * 9 / 5) + 32;
  else if (to === 'kelvin') result = celsius + 273.15;

  resultDiv.innerHTML = `<strong>${temp.toFixed(2)} ${from.charAt(0).toUpperCase() + from.slice(1)}</strong> = <strong>${result.toFixed(2)} ${to.charAt(0).toUpperCase() + to.slice(1)}</strong>`;
}