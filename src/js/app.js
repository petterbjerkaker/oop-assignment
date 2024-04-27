const prescriptionMedicines = [];
const otcMedicines = [];



const medicineForm = document.querySelector(".medicine-form");

const productName = document.querySelector(".product-name");
const manufacturer = document.querySelector(".manufacturer");
const expiration = document.querySelector(".expiration");
const selectElement = document.querySelector(".medicine-type");
const quantity = document.querySelector(".quantity");

const prescriptionMedicineUl = document.querySelector(".prescription-medicine-list");
const otcMedicineUl = document.querySelector(".otc-medicine-list");

const displayPrescriptionMedicineContainer = document.querySelector(".display-prescription-medicine");
const displayOtcMedicineContainer = document.querySelector(".display-otc-medicine");

const renderPrescriptionMedicineButton = document.querySelector(".render-prescription-medicine-button");
const renderOtcMedicineButton = document.querySelector(".render-otc-medicine-button");



medicineForm.addEventListener("submit", (e) => {
	e.preventDefault();
	let newMedicine;
	if (selectElement.value === "prescription"){
		newMedicine = new PrescriptionMedicine(
			productName.value,
			manufacturer.value,
			expiration.value,
			selectElement.value,
			quantity.value,
			selectElement.value
		);
	}else{
		newMedicine = new OtcMedicine(
			productName.value,
			manufacturer.value,
			expiration.value,
			selectElement.value,
			quantity.value,
			selectElement.value
		);
	}
	PrescriptionMedicine.addMedicine(newMedicine);
	medicineForm.reset();

	saveToLocalStorage();
});

renderPrescriptionMedicineButton.addEventListener("click", ()=>{
	UI.activeTab = "prescription";
	UI.renderMedicine(prescriptionMedicines)
})
renderOtcMedicineButton.addEventListener("click", ()=>{
	UI.activeTab = "otc";
	UI.renderOtcMedicine(otcMedicines)
})



// PRESCRIPTION MEDICINE CLASS

class PrescriptionMedicine {
	constructor(productName, manufacturer, expiration, medicinType, quantity){
		this.productName = productName;
		this.manufacturer = manufacturer;
		this.expiration = expiration;
		this.medicinType = medicinType;
		this.quantity = quantity;
		this.ID = Date.now();
	}
	static addMedicine(medicine){
		if(medicine.medicinType === "prescription"){
			prescriptionMedicines.push(medicine);
		}else{
			otcMedicines.push(medicine);
		}
	}

	static deleteMedicine(id, medicineArray){
		const index = medicineArray.findIndex(medicine => medicine.ID.toString() === id.toString());
		if(index !== -1){
			medicineArray.splice(index, 1);
			if(UI.activeTab === "prescription"){
				UI.renderMedicine(prescriptionMedicines)
			}else{
				UI.renderOtcMedicine(otcMedicines)
			}
		}
		saveToLocalStorage();
	}
}


// OTC MEDICINE CLASS

class OtcMedicine extends PrescriptionMedicine {
	constructor(productName, manufacturer, expiration, medicinType, quantity){
		super(productName, manufacturer, expiration, medicinType, quantity);
		this.ID = Date.now();
	}
}

// UI CLASS
class UI {
	static activeTab = "prescription";
	static renderMedicine(prescriptionMedicines){

		displayOtcMedicineContainer.style.display = "none";
		displayPrescriptionMedicineContainer.style.display = "block";
		prescriptionMedicineUl.textContent = "";
		if (UI.activeTab === "prescription"){

			prescriptionMedicines.forEach((medicine) => {
				const liRow = document.createElement("li");
				const renderedName = document.createElement("span");
				const renderedManufacturer = document.createElement("span");
				const renderedExpiration = document.createElement("span");
				const renderedType = document.createElement("span");
				const renderedQuantity = document.createElement("span");
				const deleteButtonContainer = document.createElement("span");
				const deleteButton = document.createElement("button");

				renderedName.textContent = medicine.productName;
				renderedManufacturer.textContent = medicine.manufacturer;
				renderedExpiration.textContent = medicine.expiration;
				renderedType.textContent = medicine.medicinType;
				renderedQuantity.textContent = medicine.quantity;
				deleteButton.textContent = "Delete ❌";

				liRow.classList.add("prescription-medicine-row");
				deleteButton.classList.add("delete-button");

				liRow.dataset.id = medicine.ID;

				prescriptionMedicineUl.append(liRow);
				liRow.append(renderedName, renderedManufacturer, renderedExpiration, renderedType, renderedQuantity, deleteButtonContainer);
				deleteButtonContainer.append(deleteButton)

				deleteButton.addEventListener("click", (e)=>{
					const rowID = e.currentTarget.parentElement.parentElement.dataset.id
					PrescriptionMedicine.deleteMedicine(rowID, prescriptionMedicines)
				})
			});
		}
	}

	//---------------------------------------------------
	static renderOtcMedicine(otcMedicines){
		otcMedicineUl.textContent = "";
		displayPrescriptionMedicineContainer.style.display = "none";
		displayOtcMedicineContainer.style.display = "block";

		if(UI.activeTab === "otc"){
			otcMedicines.forEach(otcMedicine => {
				const liRow = document.createElement("li");
				const renderedName = document.createElement("span");
				const renderedManufacturer = document.createElement("span");
				const renderedExpiration = document.createElement("span");
				const renderedType = document.createElement("span");
				const renderedQuantity = document.createElement("span");
				const deleteButtonContainer = document.createElement("span");
				const deleteButton = document.createElement("button");

				renderedName.textContent = otcMedicine.productName;
				renderedManufacturer.textContent = otcMedicine.manufacturer;
				renderedExpiration.textContent = otcMedicine.expiration;
				renderedType.textContent = otcMedicine.medicinType;
				renderedQuantity.textContent = otcMedicine.quantity;
				deleteButton.textContent = "Delete ❌";

				liRow.classList.add("otc-medicine-row");
				deleteButton.classList.add("delete-button");

				liRow.dataset.id = otcMedicine.ID;

				otcMedicineUl.append(liRow);
				liRow.append(renderedName, renderedManufacturer, renderedExpiration, renderedType, renderedQuantity, deleteButtonContainer);
				deleteButtonContainer.append(deleteButton)

				deleteButton.addEventListener("click", (e) =>{
					const rowID = e.currentTarget.parentElement.parentElement.dataset.id
					OtcMedicine.deleteMedicine(rowID, otcMedicines)
				})
			});
		}
	}
}

// LOCAL STORAGE 
const serializeData = (data) => {
	return JSON.stringify(data);
};

const deserializeData = (serializedData) =>{
	return JSON.parse(serializedData);
};

const storeDataInLocalStorage = (key, data) => {
	localStorage.setItem(key, serializeData(data));
};

const getDataFromLocalStorage = (key) => {
	const serializedData = localStorage.getItem(key);
	return serializedData ? deserializeData(serializedData) : null;
};

const loadFromLocalStorage = ()=>{
	const prescriptionMedicinesFromStorage = getDataFromLocalStorage("prescriptionMedicines");
	const otcMedicinesFromStorage = getDataFromLocalStorage("otcMedicines");

	if(prescriptionMedicinesFromStorage) {
		prescriptionMedicines.push(...prescriptionMedicinesFromStorage);
	}

	if(otcMedicinesFromStorage){
		otcMedicines.push(...otcMedicinesFromStorage);
	}

	UI.renderMedicine(prescriptionMedicines);
	UI.renderOtcMedicine(otcMedicines);
};

window.addEventListener("load", loadFromLocalStorage);

const saveToLocalStorage = ()=>{
	storeDataInLocalStorage("prescriptionMedicines", prescriptionMedicines);
	storeDataInLocalStorage("otcMedicines", otcMedicines);
};

