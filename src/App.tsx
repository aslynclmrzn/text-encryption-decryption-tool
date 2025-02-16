import './App.css'
import { useState } from 'react';

function vigenereEncrypt(text, key) {
  let encryptedText = '';
  let keyIndex = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char.match(/[a-zA-Z]/)) {
      let shift = key[keyIndex % key.length].toLowerCase().charCodeAt(0) - 97;
      let base = char === char.toLowerCase() ? 97 : 65;
      encryptedText += String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26) + base);
      keyIndex++;
    } else {
      encryptedText += char;
    }
  }
  return encryptedText;
}

function vigenereDecrypt(text, key) {
  let decryptedText = '';
  let keyIndex = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char.match(/[a-zA-Z]/)) {
      let shift = key[keyIndex % key.length].toLowerCase().charCodeAt(0) - 97;
      let base = char === char.toLowerCase() ? 97 : 65;
      decryptedText += String.fromCharCode(((char.charCodeAt(0) - base - shift + 26) % 26) + base);
      keyIndex++;
    } else {
      decryptedText += char;
    }
  }
  return decryptedText;
}
function App() {
  const [plainText, setPlainText] = useState('');
  const [encryptText, setEncryptText] = useState('');
  const [key1, setKey1] = useState('');
  const [key2, setKey2] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [error1, setError1] = useState('');
  const [error2, setError2] = useState('');
  const handleEncrypt = () => {
    if (/\d/.test(key1)) {
      setError1('Secret key should only contain letters (A-Z, a-z).');
      return;
    }
    setError1('');
    if (plainText && key1) {
      setEncryptText(vigenereEncrypt(plainText, key1));
    }
  };

  const handleDecrypt = () => {
    if (/\d/.test(key2)) {
      setError2('Secret key should only contain letters (A-Z, a-z).');
      return;
    }
    setError2('');
    if (encryptText && key2) {
      setDecryptedText(vigenereDecrypt(encryptText, key2));
    }
  };

  return (
    <>
      <div className='header'>
        <h1 className='header-h1'>Text Encryption & Decryption Tool</h1>
      </div>
      <div className='container'>
        <form action=""></form>
      </div>
      <div className="container">
  <div className="encryption-container">
    <h3>Text Encryption</h3>
    <p>Enter text to encrypt:</p>
    <div className="columns">
    <textarea className='text-area' placeholder='Encryption Input' value={plainText} onChange={(e) => setPlainText(e.target.value)}></textarea>
    <p>Enter secret key:</p>
    <input className='input' type='text' placeholder='Secret Key' value={key1} onChange={(e) => setKey1(e.target.value)} />
    {error1 && <p className='error-message'>{error1}</p>}
          <button className='button' onClick={handleEncrypt}>Encrypt</button>
          <p>Encrypted output: </p>
          <textarea className='text-area' placeholder='Encryption Output' value={encryptText} readOnly></textarea>
    </div>
  </div>
  
  <div className="decryption-container">
    <h3>Text Decryption</h3>
    <p>Enter text to decrypt:</p>
    <div className="columns">
      <textarea className="text-area" placeholder="Decryption Input"></textarea>
    <p>Enter secret key:</p>
    <input className='input' type='text' placeholder='Secret Key' value={key2} onChange={(e) => setKey2(e.target.value)} />
    {error2 && <p className='error-message'>{error2}</p>}
    <button className='button' onClick={handleDecrypt}>Decrypt</button>
    <p>Decrypted output: </p>
    <textarea className='text-area' placeholder='Decryption Output' value={decryptedText} readOnly></textarea>
  </div>
  </div>
</div>
    </>
  )
}

export default App
