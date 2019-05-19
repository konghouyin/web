var list = [{
	title: "吃饭",
	check: true,
	id: 1,
	time: "14:47"
}, {
	title: "睡觉",
	check: false,
	id: 2,
	time: "14:48"
}]



new Vue({
	el: ".main",
	data: {
		maxId: 2,
		listall: list,
		inputValue: "",
		editingtodo: "",
		type: "all"
	},
	methods: {
		addtodo() {
			this.listall.push({
				title: this.inputValue,
				check: false,
				id: Number(this.maxId) + 1,
				time: new Date()
			});
			this.maxId = Number(this.maxId) + 1;
			this.inputValue = "";
		},
		del(todo) {
			var index = this.listall.indexOf(todo);
			this.listall.splice(index, 1)
		},
		edit(todo) {
			this.editingtodo = todo;
		},
		finishedit() {
			this.editingtodo = "";
		},
		changetype(type){
			this.type=type;
		}
	},
	computed: {
		list() {
			var out = [];
			if (this.type == "all") {
				return this.listall;
			} else if (this.type == "true") {
				this.listall.forEach(function(child, index) {
					if (child.check == true) {
						out.push(child);
					}
				})
			} else if (this.type == "false") {
				this.listall.forEach(function(child, index) {
					if (child.check == false) {
						out.push(child);
					}
				})
			}
			return out;
		},
		num(){
			var num=0;
			this.listall.forEach(function(child, index) {
				if (child.check == false) {
					num++;
				}
			})
			return num;
		}
	},
	directives: {
		focus: {
			update(el, bind) {
				if (bind.value) {
					el.focus();
				}
			}
		}
	}
})
