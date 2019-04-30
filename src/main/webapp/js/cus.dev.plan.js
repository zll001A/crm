/*格式转换*/
// 格式化数据显示
// val 当前值
// row 当前行的值
// index 当前行的索引
function formatterDevResult(val) {
    if(val==0){
        return "未开发";
    }
    if(val==1){
        return "开发中";
    }
    if(val==2){
        return "开发成功";
    }
    if(val==3){
        return "开发失败";
    }
}
function formatterOp(val, row) {
    var devResult=row.devResult;
    if(devResult==0||devResult==1){
        var href="javascript:openSaleChanceInfoDialog("+'"开发机会数据"'+","+row.id+")";
        return "<a href='"+href+"'>开发</a>";
    }
    if(devResult==2||devResult==3){
        var href="javascript:openSaleChanceInfoDialog("+'"详情机会数据"'+","+row.id+")";
        return "<a href='"+href+"'>查看详情</a>";
    }
}

//开发机会数据&&详情机会数据
function openSaleChanceInfoDialog(title,id) {
    window.parent.openTab(title+"_"+id,ctx+"/cusDevPlan/index?sid="+id);
}


//搜索  查询后台前台展示数据
function querySaleChancesByParams() {
    $('#dg').datagrid('load', {
        customerName: $('#customerName').val(),
        devResult: $('#devResult').combobox('getValue'),
        createDate: $('#time').datebox("getValue")
    });
}