// 格式化数据显示
// val 当前值
// row 当前行的值
// index 当前行的索引
function formatState(val,row,index) {
    if(val==0){
        return "未分配";
    }
    if(val==1){
        return "已分配";
    }
}

function formatResult(val) {
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

//搜索  查询后台前台展示数据
function querySaleChancesByParams() {
    $('#dg').datagrid('load', {
        customerName: $('#customerName').val(),
        state: $('#state').combobox('getValue'),
        devResult: $('#devResult').combobox('getValue'),
        createDate: $('#time').datebox("getValue")
    });
}

// 在function里面的代码,会在页面加载完成后触发
$(function () {
    $('#dg').datagrid({
        rowStyler: function(index,row){

            var devResult = row.devResult;
            if (devResult == 0) {
                return "background-color:#5bc0de;"; // 蓝色
            } else if (devResult == 1) {
                return "background-color:#f0ad4e;"; // 黄色
            } else if (devResult == 2) {
                return "background-color:#5cb85c;"; // 绿色
            } else if (devResult == 3) {
                return "background-color:#d9534f;"; // 红色
            }
        }
    });
})

//打开添加框
function openAddSaleChanceDialog() {
    openAddOrUpdateDlg("dlg","添加营销记录");
}

//保存修改内容
function saveOrUpdateSaleChance() {
    saveOrUpdateData("fm",ctx + "/saleChance/addOrUpdateSaleChance","dlg",querySaleChancesByParams)
}

//打开更新弹窗
function openModifySaleChanceDialog() {

    openModifyDialog("dg","fm","dlg","更新营销机会");

}


//关闭弹窗
function closeDlg() {
    closeDlgData("dlg");
}

//删除
function deleteSaleChance() {

    deleteData("dg",ctx + "/saleChance/deleteBatchSaleChance",querySaleChancesByParams)

}