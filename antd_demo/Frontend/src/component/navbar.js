import React, { Component } from 'react';

class navbar extends Component {
    render() {
        return (
            <div className="accountAndNav">
                <div className="account">Insert name here</div>
                <div className="nav"><button>
                    Home
</button>
                    <button>
                        Split Cost
</button>
                    <button>
                        Save
</button>
                </div>
            </div>
        );
    }
}

export default navbar;