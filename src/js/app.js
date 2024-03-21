class PrescriptionMedicine {
	constructor(name, manufacturer, expiration, type, quantity){
		this.name = name;
		this.manufacturer = manufacturer;
		this.expiration = expiration;
		this.type = type;
		this.quantity = quantity;
		this.ID = Date.now();
	}
}

class OTCMedicine extends PrescriptionMedicine {
	constructor(name, manufacturer, expiration, type, quantity){
		super(name, manufacturer, expiration, type, quantity);
		this.ID = Date.now();

	}
}