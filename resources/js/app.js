import './bootstrap';
import {TitleBar, Modal, Button} from '@shopify/app-bridge/actions'

const app = window.app;
const actions = window.actions;

const titleBarOptions = {
    title: 'Faker',
};
const myTitleBar = TitleBar.create(app, titleBarOptions);

const okButton = Button.create(app, {label: 'Ok'});
const cancelButton = Button.create(app, {label: 'Cancel'});

const modalOptions = {
    title: 'Faker Modal',
    message: 'Hello world!',
    footer: {
        buttons: {
            primary: okButton,
            secondary: [cancelButton]
        }
    }
};
const myModal = Modal.create(app, modalOptions);

myModal.dispatch(Modal.Action.OPEN)

cancelButton.subscribe(Button.Action.CLICK, () => {
    myModal.dispatch(Modal.Action.CLOSE)
})

okButton.subscribe(Button.Action.CLICK, () => {
    window.axios.get('/me').then(res => console.log(res))
})
