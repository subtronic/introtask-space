/**
 * Создает экземпляр космического корабля.
 * @name Vessel
 * @param {String} name Название корабля.
 * @param {Number}[] position Местоположение корабля.
 * @param {Number} capacity Грузоподъемность корабля.
 */
function Vessel(name, position, capacity) {
	this.name=name;
	this.position=position;
	this.capacity=[0,capacity];//сделать приватным свойство
}
/**
 * Текущая загруженность корабля
 * @name engaged
Vessel.prototype.OccupiedWeight =0;
*/
/**
 * Выводит текущее состояние корабля: имя, местоположение, доступную грузоподъемность.
 * @example
 * vessel.report(); // Грузовой корабль. Местоположение: Земля. Товаров нет.
 * @example
 * vesserl.report(); // Грузовой корабль. Местоположение: 50,20. Груз: 200т.
 * @name Vessel.report
 */
Vessel.prototype.report = function () { return 'Корабль "'+this.name+'". Местоположение: '+this.position[0]+','+this.position[1]+'. Занято: '+this.capacity[0]+' из '+this.capacity[1]+'кг';}

/**
 * Выводит количество свободного места на корабле.
 * @name Vessel.getFreeSpace
 */
Vessel.prototype.getFreeSpace = function () { return this.capacity[0];}

/**
 * Выводит количество занятого места на корабле.
 * @name Vessel.getOccupiedSpace
 */
Vessel.prototype.getOccupiedSpace = function () { return this.capacity[1]-this.capacity[0];}

/**
 * Переносит корабль в указанную точку.
 * @param {Number}[]|Planet newPosition Новое местоположение корабля.
 * @example
 * vessel.flyTo([1,1]);
 * @example
 * var earth = new Planet('Земля', [1,1]);
 * vessel.flyTo(earth);
 * @name Vessel.report
 */
Vessel.prototype.flyTo = function (newPosition) {	
	if(newPosition instanceof Planet)
	{
		this.position=newPosition.position;	
	} else {
		this.position=newPosition;		
	}
}

/**
 * Создает экземпляр планеты.
 * @name Planet
 * @param {String} name Название Планеты.
 * @param {Number}[] position Местоположение планеты.
 * @param {Number} availableAmountOfCargo Доступное количество груза.
 */
function Planet(name, position, availableAmountOfCargo) {
	this.name=name;
	this.position=position;
	this.availableAmountOfCargo=availableAmountOfCargo;//сделать приватным
}

/**
 * Выводит текущее состояние планеты: имя, местоположение, количество доступного груза.
 * @name Planet.report
 */
Planet.prototype.report = function () { 
	
	var strAvailableAmountOfCargo= (this.availableAmountOfCargo==0)?' Грузов нет.': ' Доступно груза: '+this.availableAmountOfCargo+'кг';
	return 'Планета "'+this.name+'". Местоположение: '+this.position[0]+','+this.position[1]+'.'+strAvailableAmountOfCargo}

/**
 * Возвращает доступное количество груза планеты.
 * @name Vessel.getAvailableAmountOfCargo
 */
Planet.prototype.getAvailableAmountOfCargo = function () {return this.availableAmountOfCargo;}

/**
 * Загружает на корабль заданное количество груза.
 * 
 * Перед загрузкой корабль должен приземлиться на планету.ы
 * @param {Vessel} vessel Загружаемый корабль.
 * @param {Number} cargoWeight Вес загружаемого груза.
 * @name Vessel.loadCargoTo
 */
Planet.prototype.loadCargoTo = function (vessel, cargoWeight) {
	if (vessel.position==this.position)
	{
		console.log('приземлился!');
		if((vessel.capacity[1]-vessel.capacity[0]>=cargoWeight)&&(this.availableAmountOfCargo>=cargoWeight))
		{
			vessel.capacity[0]=cargoWeight;ds
			this.availableAmountOfCargo-=cargoWeight;
		} else {
			var currentAvailableAmountOfCargo= Math.min(vessel.capacity[1]-vessel.capacity[0], cargoWeight-this.availableAmountOfCargo);
			//доделать, отрицательные равны нулю что бы было			
			console.log(currentAvailableAmountOfCargo);		
		}
	}
}

/**
 * Выгружает с корабля заданное количество груза.
 * 
 * Перед выгрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Разгружаемый корабль.
 * @param {Number} cargoWeight Вес выгружаемого груза.
 * @name Vessel.unloadCargoFrom
 */
Planet.prototype.unloadCargoFrom = function (vessel, cargoWeight) {
	if (vessel.position==this.position)
	{
		console.log('приземлился!');
		if (vessel.capacity[0]>=cargoWeight)
		{
			vessel.capacity=-cargoWeight;
			this.availableAmountOfCargo+=cargoWeight;		
		} else {
			this.availableAmountOfCargo+=vessel.capacity[0];
			vessel.capacity=0;
		}// костыль переделать
	}
}
