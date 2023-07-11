import React, { CSSProperties } from "react";

interface Param {
	id: number;
	name: string;
	type?: string;
}

interface ParamValue {
	paramId: number;
	value: string;
}

interface Color {
	colorId: number;
	value: string;
}

interface Model {
	paramValues: ParamValue[];
	colors?: Color[];
}

interface Props {
	params: Param[];
	model: Model;
}

interface rowData {
	id: number;
	name: string;
	inputType: string;
	defaultValue: string;
	textColor?: CSSProperties;
}

interface State {
	model: Model;
}

const styles = {
	container: {
		padding: "2rem",
		fontSize: "20px",
		color: "black",
		minWidth: "100%",
	},
	list: {
		listStyleType: "none",
		maxWidth: "fit-content",
		margin: "0 auto",
	},
	item: {
		display: "flex",
		justifyContent: "space-between",
		marginBottom: "0.1rem",
	},
	input: {
		marginLeft: "1rem",
		fontSize: "1.2rem",
		borderColor: "black",
	},
};

class ParamEditor extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { model: this.props.model };
	}

	public getModel(): Model {
		return this.state.model;
	}

	private createData() {
		const defaultColor = "black";
		const defaultInputType = "text";
		let rowsData: rowData[] = [];
		const { params } = this.props;

		params.map((row) => {
			const currentModelValue = this.state.model.paramValues.filter(
				(param) => param.paramId === row.id
			)[0].value;
			const currentModelColor = this.state.model.colors?.filter((color) => color.colorId === row.id)[0]
				?.value;

			rowsData.push({
				id: row.id,
				name: row.name,
				inputType: defaultInputType,
				defaultValue: currentModelValue,
				textColor: { color: currentModelColor || defaultColor },
			});
		});

		return rowsData;
	}

	handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		this.setState((state) => {
			state.model.paramValues.filter((item) => item.paramId === Number(e.target.id))[0].value =
				e.target.value;
		});
	}

	render() {
		const data = this.createData();
		return (
			<section style={styles.container}>
				<ul style={styles.list}>
					{data.map((row) => (
						<li key={row.id} style={styles.item}>
							<label htmlFor={row.name} style={row.textColor}>
								{row.name}
							</label>
							<input
								defaultValue={row.defaultValue}
								id={row.id.toString()}
								name={row.name}
								style={styles.input}
								type={row.inputType}
								onChange={(e) => this.handleChange(e)}
							></input>
						</li>
					))}
				</ul>
			</section>
		);
	}
}

export default ParamEditor;
