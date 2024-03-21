class PrescriptionMedicine {
	constructor(name, manufacturer, id, expiration, type, quantity){
		this.name = name;
		this.manufacturer = manufacturer;
		this.id = id;
		this.expiration = expiration;
		this.type = type;
		this.quantity = quantity;
		this.ID = Date.now()
	}
}

class OTCMedicine extends PrescriptionMedicine {
	
}