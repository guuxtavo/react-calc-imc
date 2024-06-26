import { useState } from 'react'
import styles from './App.module.css'
import poweredImage from './assets/powered.png'
import leftArrowImage from './assets/leftarrow.png'

import {levels, calculateImc} from './helpers/imc'

import { GridItem } from './components/GridItem'
import { Level } from './types/Level'

const App = () => {

	const [heightField, setHeightField] = useState<number>(0)
	const [weightField, setWeightField] = useState<number>(0)
	const [toShow, setToShow] = useState<Level | null>()

	const handleCalculateButton = () => {
		if (heightField && weightField) {
			setToShow(calculateImc(heightField, weightField))
		} else {
			alert("Digite todos os campos.")
		}
	}

	const handleBackButton = () => {
		setToShow(null)
		setHeightField(0)
		setWeightField(0)
	}

	return (
		<div className={styles.main} >
			<header>
				<div className={styles.headerContainer}>
					<img src={poweredImage} alt="Logo" width={150} />
				</div>
			</header>
			<div className={styles.container}>
				<div className={styles.leftSide} >
					<h1>Calcule o seu IMC.</h1>
					<p>O Índice de Massa Corporal (IMC) é uma das principais ferramentas, adotada inclusive pela Organização Mundial de Saúde (OMS), para calcular o chamado “peso ideal”.</p>

					<input
						type="number"
						disabled={toShow ? true : false}
						placeholder='Digite a sua altura. Ex: 1.5 (em metros)'
						value={heightField > 0 ? heightField : ''}
						onChange={e => setHeightField(parseFloat(e.target.value))}
					/>
					<input
						type="number"
						disabled={toShow ? true : false}
						placeholder='Digite o seu peso. Ex: 75.3 (em kg)'
						value={weightField > 0 ? weightField : ''}
						onChange={e => setWeightField(parseFloat(e.target.value))}
					/>

					<button 
					disabled={toShow ? true : false}
					onClick={handleCalculateButton} >Calcular</button>
				</div>
				<div className={styles.rightSide} >
					{!toShow && 
					<div className={styles.grid} >
					{levels.map((item, key) => (
						<GridItem key={key} item={item} />
					))}
				</div>}

				{toShow && 
					<div className={styles.rightBig}>
						<div className={styles.rightArrow} onClick={handleBackButton} >
							<img src={leftArrowImage} alt="" width={25} />
						</div>
						<GridItem item={toShow} />
					</div>
				}
				</div>
			</div>
		</div>
	)
}

export default App;