import React, { useState } from 'react';

import Rodal from 'rodal/lib/rodal';
import { Form, Button } from 'react-bootstrap';

import 'rodal/lib/rodal.css';

const Confirm = () => {
    return (
        <div>
            <Rodal height={200} width={300} visible={true}>
                <Button>Co</Button>
            </Rodal>
        </div>
    )
}

export default Confirm;