import Select from 'react-select'
import makeAnimated from 'react-select/animated';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'lemon', label: 'Lemon2' }
  ]

const animatedComponents = makeAnimated();

function Cooktype() {
    return (
        <>
            <h2>Favorite kitchen</h2>
            <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={options}
            />
        </>
    )
}

export default Cooktype