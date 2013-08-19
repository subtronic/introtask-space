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
	this.capacity=capacity;//сделать приватным свойство
	this.loaded=0;
}

/**
 * Выводит текущее состояние корабля: имя, местоположение, доступную грузоподъемность.
 * @example
 * vessel.report(); // Грузовой корабль. Местоположение: Земля. Товаров нет.
 * @example
 * vesserl.report(); // Грузовой корабль. Местоположение: 50,20. Груз: 200т.
 * @name Vessel.report
 */
Vessel.prototype.report = function () { return 'Корабль "'+this.name+'". Местоположение: '+this.position[0]+','+this.position[1]+'. Занято: '+this.loaded+' из '+this.capacity+'т.';}

/**
 * Выводит количество свободного места на корабле.
 * @name Vessel.getFreeSpace
 */
Vessel.prototype.getFreeSpace = function () { return this.capacity-this.loaded}

/**
 * Выводит количество занятого места на корабле.
 * @name Vessel.getOccupiedSpace
 */
Vessel.prototype.getOccupiedSpace = function () { return this.loaded}

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
	
	var strAvailableAmountOfCargo= (this.availableAmountOfCargo==0)?' Грузов нет.': ' Доступно груза: '+this.availableAmountOfCargo+'т.';
	return 'Планета "'+this.name+'". Местоположение: '+this.position[0]+','+this.position[1]+'.'+strAvailableAmountOfCargo}

/**
 * Возвращает доступное количество груза планеты.
 * @name Vessel.getAvailableAmountOfCargo
 */
Planet.prototype.getAvailableAmountOfCargo = function () {return this.availableAmountOfCargo}

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
		if((vessel.capacity-vessel.loaded>=cargoWeight)&&(this.availableAmountOfCargo>=cargoWeight))
		{
			vessel.loaded=cargoWeight;
			this.availableAmountOfCargo-=cargoWeight;
		} else {
			
			/*Проверяем возможность загрузки груза*/
			var currentAvailableAmountOfCargo= Math.min(((vessel.capacity-vessel.loaded)<0)?0:vessel.capacity-vessel.loaded, ((cargoWeight-this.availableAmountOfCargo)<0)?0:cargoWeight-this.availableAmountOfCargo);
			
			console.log(currentAvailableAmountOfCargo);		
		}
	} else { console.log('Корабль "'+vessel.name+'" не может приземлится на планету "'+this.name+'"');}
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
		if (vessel.loaded>=cargoWeight)
		{
			vessel.capacity-=cargoWeight;
			this.availableAmountOfCargo+=cargoWeight;		
		} else {
			//выгружаем все что есть с корабля
			this.availableAmountOfCargo+=vessel.loaded;
			vessel.loaded=0;
		}
	}
}
