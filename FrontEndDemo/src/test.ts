class ViewModel {

    Source1: ej.DataManager = new ej.DataManager([
        {
            text: "Source1--Algeria 1111",
            value: 0
        },
        {
            text: "Source1--Argentina 2222",
            value: 1
        }
    ]);

    Source2: ej.DataManager = new ej.DataManager([
        {
            text: "Sourc2-Algeria 1111",
            value: 0
        },
        {
            text: "Sourc2-Argentina 2222",
            value: 1
        }
    ]);
    Source2Query: any;

    DataList_Arr: KnockoutObservableArray<any> = ko.observableArray([
        {
            text: "Sourc2-Algeria 1111",
            value: 0
        },
        {
            text: "Sourc2-Argentina 2222",
            value: 1
        }
    ]);
    DataList: KnockoutObservableArray<any> = ko.observableArray([
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
    DataList2: any = ko.mapping.fromJS([
        {
            text: "Sourc2-Algeria 1111",
            value: 0
        },
        {
            text: "Sourc2-Argentina 2222",
            value: 1
        }
    ]);
    DataList3: any = ko.observable({
        text: ko.observable("Sourc2-Algeria 1111"),
        value: ko.observable(0)
    });
    DataList4: any = ko.mapping.fromJS({
        text: "Sourc2-Algeria 1111",
        value: 0
    });
    Value1: KnockoutObservable<any> = ko.observable(0);
    Value2: KnockoutObservable<any> = ko.observable(0);

    constructor() {

        this.Source2Query = ko.computed(() => {
            return new ej.Query().where("value", ej.FilterOperators.equal, this.Value1());
        });

        this.Value1.subscribe((a: any) => {
            console.log('value1: ' + a);
        });

        //监听事件
        // this.DataList.subscribe((a: any) => {
        //     console.log('value1: ' + a);
        // });

        this.DataList_Arr().forEach((item: any) => {
            console.log('DataList_Arr: ' + item.text);
        });
        this.DataList().forEach((item: any) => {
            console.log('DataList: ' + item.text());
        });
        this.DataList2().forEach((item: any) => {
            console.log('DataList2: ' + item.text());
        });
        console.log(this.DataList3().text())
        console.log(this.DataList4.text())

        //ko.observable/observableArray vs ko.mapping.fromJS
        //ko.observable/observableArray 会将data f()化（observable--也是就是双向绑定），但是不会将data中的对象属性f()化
        let temp = [{ text: 'text', value: 'value' }];
        let temp2 = [{ text: ko.observable("text"), value: ko.observable('value') }];
        console.log(ko.observableArray(temp)()[0].text);
        console.log(ko.observableArray(temp2)()[0].text());
        console.log(ko.mapping.fromJS(temp)()[0].text());
        // console.log(ko.mapping.fromJS(temp2)()[0].text());  //其实输出是对的，但语义上不支持 提示not callable

        let temp3 = { text: 'text', value: 'value' };
        let temp4 = { text: ko.observable("text"), value: ko.observable('value') };
        console.log(ko.observable(temp3)().text);
        console.log(ko.observable(temp4)().text());
        console.log(ko.mapping.fromJS(temp3).text());
        // console.log(ko.mapping.fromJS(temp4).text());   //其实输出是对的，但语义上不支持 提示not callable

        //ej.DataManager==>{adaptor:{dataSource:source,options:[]},dataSource:{dataType:'json',json:[],offline:true},defaultQuery:query}
        console.log(new ej.DataManager(temp));  //json:[{text:'text',value:'value'}]
        console.log(new ej.DataManager(temp2)); //json:[{text:f(),value:f()}]
    }
}


ko.applyBindings(new ViewModel());