import React from "react";
import {getSubscriptions, unSubscribe} from "./Creator";
import store from "../store";

class BuyerSubscription extends React.Component {
    constructor(props) {
        super();
        this.state = {
            subscriptions: []
        }
    }

    async componentDidMount() {
        await getSubscriptions();
        this.setSubscriptions()
    }

    setSubscriptions() {
        let subscriptions = store.getState().subscriptions.get(0).subscriptions;
        this.setState({subscriptions: subscriptions})
    }

    render() {
        const subscriptions = this.state.subscriptions;
        return (
            <div>
                <div className="ui divider"/>
                <h3>My Subscriptions</h3>
                <div className="ui divider"/>
                <div>
                    <table className="ui orange table">
                        <tbody>
                        <tr>
                            <th className="tableData">#</th>
                            <th className="tableData">Selle rName</th>
                            <th className="tableData">Action</th>
                        </tr>
                        {subscriptions.map((subscription, index) =>
                                               <tr key={subscription._id} className="tableData">
                                                   <td key={index + 1}>{index + 1}
                                                   </td>
                                                   <td key={index + 2} className="tableData">
                                                       {subscription.firstName + " "
                                                        + subscription.lastName}
                                                   </td>
                                                   <td key={index + 3} className="tableData">
                                                       <button key={index + 4}
                                                               className="ui youtube button"
                                                               onClick={async () => {
                                                                   await unSubscribe(
                                                                       subscription._id);
                                                                   await this.setSubscriptions()
                                                               }
                                                               }
                                                       >
                                                           Unsubscribe
                                                       </button>
                                                   </td>
                                               </tr>)}
                        </tbody>
                    </table>
                </div>

            </div>
        );
    }

}

export default BuyerSubscription