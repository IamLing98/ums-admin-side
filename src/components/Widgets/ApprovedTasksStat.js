/**
 * Recent Orders
 */
import React, { Component } from 'react';

// api
import {api} from 'Api';
import Moment from "react-moment";

class ApprovedTasksStat extends Component {

	state = {
		recentOrders: null
	}

	componentDidMount() {
		this.getRecentOrders();
	}

	// recent orders
	getRecentOrders() {

	}

	render() {
		const { recentOrders } = this.state;
		return (
			<div className="table-responsive">
				<table className="table table-hover mb-0">
					<thead>
						<tr>
							<th>Title</th>
							<th>Client Name</th>
							<th>Date Created</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{recentOrders && recentOrders.map((task, key) => (
							<tr key={key}>
								<td>{task.Title}</td>
								<td>{`${task.client.firstName} ${task.client.lastName}`}</td>

								<td>  <Moment format="YYYY/MM/DD">
									{task.createdDate}
								</Moment></td>
								<td>
									<span className={`badge success`}>{task.status}</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}

export default ApprovedTasksStat;
