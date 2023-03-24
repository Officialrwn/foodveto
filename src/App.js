import { createWorker } from 'tesseract.js'
import { useEffect, useState } from 'react'
import './App.css';

const test = async (setMenu) => {
	const worker = await createWorker({
		logger: m => console.log("Reading")
	});
	
	await worker.loadLanguage('eng');
	await worker.initialize('eng');
	const { data: { text } } = await worker.recognize('https://lh6.googleusercontent.com/ISNXu34rPPkzrle9k2NxdpvpjVAWAvKF0QdLr8PfnOBMBoohsmBFdb26zLYoUSk0-emjVL0wE1mXD24xeZk5pPUVVU24yHrZ_D3lTmeDddAEtICufKrTTnb5tFVSVeAxcQ=w1280');
	const menu = text.split("\n");
	// console.log(menu);
	setMenu(menu);
	await worker.terminate();
}

const App = () => {
	const [useMenu, setMenu] = useState([]);
	useEffect(() => {
		test(setMenu);
		console.log("MENU: ", useMenu);
	}, []);

  return (
    <div className="App">
			{ useMenu.map((item, index) => {
				return (
					<p key={index}>{item}</p>
				);
			})}
    </div>
  );
}

export default App;
