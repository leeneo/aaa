var ViewModel = /** @class */ (function () {
    function ViewModel() {
        var _this = this;
        this.Source1 = new ej.DataManager([
            {
                text: "Source1--Algeria 1111",
                value: 0
            },
            {
                text: "Source1--Argentina 2222",
                value: 1
            }
        ]);
        this.Source2 = new ej.DataManager([
            {
                text: "Sourc2-Algeria 1111",
                value: 0
            },
            {
                text: "Sourc2-Argentina 2222",
                value: 1
            }
        ]);
        this.DataList_Arr = ko.observableArray([
            {
                text: "Sourc2-Algeria 1111",
                value: 0
            },
            {
                text: "Sourc2-Argentina 2222",
                value: 1
            }
        ]);
        this.DataList = ko.observableArray([
            //这里这样写也是一样效果：DataList: KnockoutObservable<any> = ko.observable([])
            //但还是建议数组用这种：ko.observableArray([])，对象用这种：ko.observable({})
            {
                text: ko.observable("Sourc2-Algeria 1111"),
                value: ko.observable(0)
            },
            {
                text: ko.observable("Sourc2-Argentina 2222"),
                value: ko.observable(1)
            }
        ]);
        this.DataList2 = ko.mapping.fromJS([
            {
                text: "Sourc2-Algeria 1111",
                value: 0
            },
            {
                text: "Sourc2-Argentina 2222",
                value: 1
            }
        ]);
        this.DataList3 = ko.observable({
            text: ko.observable("Sourc2-Algeria 1111"),
            value: ko.observable(0)
        });
        this.DataList4 = ko.mapping.fromJS({
            text: "Sourc2-Algeria 1111",
            value: 0
        });
        this.Value1 = ko.observable(0);
        this.Value2 = ko.observable(0);
        this.Source2Query = ko.computed(function () {
            return new ej.Query().where("value", ej.FilterOperators.equal, _this.Value1());
        });
        this.Value1.subscribe(function (a) {
            console.log('value1: ' + a);
        });
        //监听事件
        // this.DataList.subscribe((a: any) => {
        //     console.log('value1: ' + a);
        // });
        this.DataList_Arr().forEach(function (item) {
            console.log('DataList_Arr: ' + item.text);
        });
        this.DataList().forEach(function (item) {
            console.log('DataList: ' + item.text());
        });
        this.DataList2().forEach(function (item) {
            console.log('DataList2: ' + item.text());
        });
        console.log(this.DataList3().text());
        console.log(this.DataList4.text());
        //ko.observable/observableArray vs ko.mapping.fromJS
        //ko.observable/observableArray 会将data f()化（observable--也是就是双向绑定），但是不会将data中的对象属性f()化
        var temp = [{ text: 'text', value: 'value' }];
        var temp2 = [{ text: ko.observable("text"), value: ko.observable('value') }];
        console.log(ko.observableArray(temp)()[0].text);
        console.log(ko.observableArray(temp2)()[0].text());
        console.log(ko.mapping.fromJS(temp)()[0].text());
        // console.log(ko.mapping.fromJS(temp2)()[0].text());  //其实输出是对的，但语义上不支持 提示not callable
        var temp3 = { text: 'text', value: 'value' };
        var temp4 = { text: ko.observable("text"), value: ko.observable('value') };
        console.log(ko.observable(temp3)().text);
        console.log(ko.observable(temp4)().text());
        console.log(ko.mapping.fromJS(temp3).text());
        // console.log(ko.mapping.fromJS(temp4).text());   //其实输出是对的，但语义上不支持 提示not callable
        //ej.DataManager==>{adaptor:{dataSource:source,options:[]},dataSource:{dataType:'json',json:[],offline:true},defaultQuery:query}
        console.log(new ej.DataManager(temp)); //json:[{text:'text',value:'value'}]
        console.log(new ej.DataManager(temp2)); //json:[{text:f(),value:f()}]
    }
    return ViewModel;
}());
ko.applyBindings(new ViewModel());
