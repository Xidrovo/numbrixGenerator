import React, { useState } from 'react';
import Board from '../components/Board';

import { generateNumbrix, removeValues } from '../helpers/numbrixGenerator';

const pageStyles = {
  color: "#232129",
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
const IndexPage = () => {
  const MAX_RETRY = 10000
  const [size, setSize] = useState({ width: 5, height: 5 });
  const [board, setBoard] = useState([])
  const [hiddenBoard, setHiddenBoard] = useState([])
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('¡Generar!')

  const articleInputStyle = "w-1/4 md:px-0 md:w-1/12"
  const inputStyle = "border border-gray-600 p-2 rounded-lg mt-1"

  const getNumbrix = (countNumber = 0) => {
    try {
      const newBoard = generateNumbrix(parseInt(size.width, 10), parseInt(size.height, 10))
      setBoard(JSON.parse(JSON.stringify(newBoard)))
      setHiddenBoard(removeValues(parseInt(size.width, 10), parseInt(size.height, 10), newBoard))
      countNumber = 0
      setLoading(false)
      setErrorMessage('¡Generar!')
    } catch (error) {
      console.log(countNumber)
      if (countNumber > MAX_RETRY) {
        setBoard([])
        setHiddenBoard([])
        setErrorMessage('Vuelva a intentarlo')
        return 'Max retries'
      }
      getNumbrix(countNumber + 1)
    }
  }

  const handleInput = ({ target }) => {
    let { value, name } = target
    if (value > 10) {
      value = 10
    }
    setSize({ ...size, [name]: value })
  }
  return (
    <main style={pageStyles}>
      <section className='items-center mt-12'>
        <article className='flex flex-row justify-around'>
          <div className={articleInputStyle}>
            <label className='flex flex-col'>
              Altura:
              <input
                onChange={handleInput}
                type="number" max={10} value={size.width} name="width" className={inputStyle} placeholder='Select X' />
            </label>
          </div>
          <div className={articleInputStyle}>
            <label className='flex flex-col'>
              Ancho:
              <input
                onChange={handleInput}
                type="number" max={10} value={size.height} name="height" className={inputStyle} placeholder='Select X' />
            </label>
          </div>
        </article>
        <article className='flex justify-center'>
          <button
            onClick={async () => {
              await setLoading(true)
              getNumbrix(0)
            }}
            className='py-2 px-4 my-4 rounded-lg text-white font-medium bg-teal-900'>
            {errorMessage}
          </button>
        </article>
      </section>
      {loading ? <div className='text-center mt-28 text-xl font-semibold'>This may take a while... or the page is just broken <p className=' rotate-90'>:3</p></div> :
        board.length > 0 &&
        <React.Fragment>
          <section className='flex-col flex md:flex-row justify-around items-center'>
            <section className='mt-4 flex flex-col'>
              <Board board={board} />
              <p className='mt-4'>Solved Numbrix</p>
            </section>
            <section className='mt-4 flex flex-col'>
              <Board board={hiddenBoard} />
              <p className='mt-4'>Hidden Numbrix</p>
            </section>
          </section>
        </React.Fragment>
      }
    </main>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>
