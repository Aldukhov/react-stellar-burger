import {} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import { useSelector} from 'react-redux';
import Ingredient from '../ingredients/ingredient/ingredient';
import ConstructorIngredient from '../constructor/ConstructorIngredient/constructorIngredient';

export default function RenderItemsOfType(props) {
    const { items } = useSelector(state => state.burgerItems);

        let ingrediens;
    if (props.burger === 'ingrediens') {
        
        const filterType = items.data.filter((element) => element.type === props.type);

        ingrediens = filterType.map((element) => {
            return (
                <Ingredient styles={props.styles} element={element} openModal={props.openModal} key={element._id} />
            )
        })
    }
    else {
        if (props.data.length > 0) {
            ingrediens = props.data
                .filter((element) => element.constructorType === props.type)
                .map((element, index) => (

                    <ConstructorIngredient 
                    styles={props.styles} location={props.location} 
                    isLocked={props.isLocked} extraClass={props.extraClass} 
                    element={element} index={index} moveItem = {props.moveItem}
                    />
                ));
        }
    }

    return ingrediens;
}

RenderItemsOfType.propTypes = {
    burger: PropTypes.string,
    type: PropTypes.string,
    location: PropTypes.string,
    styles: PropTypes.object,
    extraClass: PropTypes.string,
    isLocked: PropTypes.bool
}
