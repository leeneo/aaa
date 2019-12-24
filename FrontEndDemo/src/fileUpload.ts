class fileuploadViewModel {

    RowId1=1;
    RowId2=2;
    FileName='FileName';

    DataSource=[{RowId:1,Value:'value1',Today:''},{RowId:2,Value:'value2',Today:''}];

    constructor() {

        for(let item of this.DataSource){
            item.Today=new Date().toLocaleDateString();
        }
    }

        /**
     * 选择文件事件
     * @param v 当前ViewModel
     * */
    onTextChanged(id: any,obj: any, event: any): void {
        console.log(id);
        console.log(event);
        console.log(obj);
        var doc = document.getElementById("File"+id) as HTMLInputElement;
        var a = document.getElementById(`upLoadButton${id}`) as HTMLAnchorElement;
        let files = doc.files as FileList;
        let text = '';
        if (files.length > 0) {
            text += files[0].name + ',';
            a.innerText = text.slice(0, text.length - 1);
        }
    }
    /**
     * 上传按钮点击事件
     * @param v 当前ViewModel
     */
    UploadButton(id:number,obj:any,event:any): void {
        console.log(id);
        console.log(event);
        console.log(obj);
        var fileInp = document.getElementById("File"+id) as HTMLInputElement;    
        fileInp.click();
    }

}


ko.applyBindings(new fileuploadViewModel());
