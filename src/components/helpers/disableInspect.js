/* eslint-disable */
import swal from 'sweetalert';

const DisableInS = () => {
    document.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        swal({
            title: 'Opps!',
            text: 'Developer option is disabled on this site!',
            icon: 'warning',
            button: 'Ok!',
        });
    });

    document.onkeydown = function (e) {
        if (e.keyCode == 123) {
            swal({
                title: 'Opps!',
                text: 'Developer option is disabled on this site!',
                icon: 'warning',
                button: 'Ok!',
            });
            return false;
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
            swal({
                title: 'Opps!',
                text: 'Developer option is disabled on this site!',
                icon: 'warning',
                button: 'Ok!',
            });
            return false;
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
            swal({
                title: 'Opps!',
                text: 'Developer option is disabled on this site!',
                icon: 'warning',
                button: 'Ok!',
            });
            return false;
        }
        if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
            swal({
                title: 'Opps!',
                text: 'Developer option is disabled on this site!',
                icon: 'warning',
                button: 'Ok!',
            });
            return false;
        }
    };
};

export default DisableInS;
