//1、View Model（数据模型）
var myViewModel = {
    //监控(Observable):视图模型变化自动更新你的UI
    personName: ko.observable('Bob'),
    personAge: ko.observable(123)
};
//4、注册订阅,通知,变化监控，你可以调用subscribe函数
myViewModel.personName.subscribe(function (newValue) {
    alert("The person's new name is " + newValue);
});
////5、终止订阅
//var subscription = myViewModel.personName.subscribe(function (newValue) { /* do stuff */ });
//// ...then later... 
//subscription.dispose(); // I no longer want notifications
//6、监控发生之前执行相关业务，可以使用beforeChange事件
myViewModel.personName.subscribe(function (oldValue) {
    alert("The person's previous name is " + oldValue);
}, null, "beforeChange");
//7、强行监控属性实时通知用户
//当赋值一个包含原始值（一个数字，字符串，布尔值，或者为null）监控属性，使用内置的notified ，以确保一个观测监控属性的用户总是得到通知，即使该值是相同的。
myViewModel.personName.extend({
    notify: 'always'
});
//8、延缓或抑制更改通知
//通常情况下，监控属性值改变会立即通知其用户。
//但是，如果一个监控属性频繁更新会带来高昂的数据传输代价，你可以通过限制或延迟变更通知获得更好的性能。这是通过使用rateLimit增量实现
// 确保每50毫秒周期内通知不超过一次的更改 
myViewModel.personName.extend({
    rateLimit: 50
});
//3、DOM就绪后,激活KO的绑定关系，使之生效。
ko.applyBindings(myViewModel);
//3、写监控属性
myViewModel.personName('Mary');
//读监控属性
console.log(myViewModel.personName());
