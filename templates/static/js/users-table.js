//右边部分的页面跳转
function showMainContent_news(sectionId) {
    // 隐藏所有内容区域
    document.getElementById('news-management').style.display = 'none';
    document.getElementById('news-visualization').style.display = 'none';

    // 显示选定的内容区域
    document.getElementById(sectionId).style.display = 'block';
}
function showMainContent_ads(sectionId) {
    // 隐藏所有内容区域
    document.getElementById('ads-management').style.display = 'none';
    document.getElementById('ads-visualization').style.display = 'none';

    // 显示选定的内容区域
    document.getElementById(sectionId).style.display = 'block';
}
function showMainContent_uers(sectionId) {
    // 隐藏所有内容区域
    document.getElementById('users-management').style.display = 'none';
    document.getElementById('users-visualization').style.display = 'none';

    // 显示选定的内容区域
    document.getElementById(sectionId).style.display = 'block';
}

var newBtn = document.querySelector(".new")   //新建按钮
var mask = document.querySelector(".mask")    //遮罩
var newDialogForm = document.querySelector(".newDialogForm")   //新建记录对话模拟框
var editDialogForm = document.querySelector(".editDialogForm")   //编辑记录对话模拟框
var xNewClose = document.querySelector(".newDialogForm>header>strong")   //新建窗口右上角的×
var btnNewClose = document.querySelector(".newClose")     //新建窗口关闭按钮
var btnNewSave = document.querySelector(".newSave")       //新建窗口保存按钮
var xEditClose = document.querySelector(".editDialogForm>header>strong")   //编辑窗口右上角的×
var btnEditClose = document.querySelector(".editClose")     //编辑窗口关闭按钮
var btnEditSave = document.querySelector(".editSave")       //编辑窗口保存按钮
var btnDeletes = document.querySelectorAll(".delete")    //删除按钮
var btnEdits = document.querySelectorAll(".edit")      //编辑按钮
var recordTable = document.querySelector(".recordForm>tbody")    //表格数据主体
var num = 3   //当前表格的记录数量
var editObj   //当前修改的记录

//隐藏新建记录对话模拟框
function closeNewDialog() {
    mask.style.display = 'none'
    newDialogForm.style.display = 'none'
}

//展示新建记录对话模拟框
function showNewDialog() {
    mask.style.display = 'block'
    newDialogForm.style.display = 'block'
}

    //隐藏编辑记录对话模拟框
function closeEditDialog() {
    mask.style.display = 'none'
    editDialogForm.style.display = 'none'
}

//展示编辑记录对话模拟框
function showEditDialog() {
    mask.style.display = 'block'
    editDialogForm.style.display = 'block'
}

//给所有删除按钮和编辑按钮绑定点击事件
for (let idx = 0; idx < btnDeletes.length; idx++) {
    // 删除动作
    btnDeletes[idx].addEventListener('click', function () {
        num--
        recordTable.removeChild(this.parentNode.parentNode)
        var numList = document.querySelectorAll(".recordForm>tbody>tr>td:nth-child(1)")   //表格数据编号单元格列表
        //删除节点后编号重新排序
        for (var i = 0; i < numList.length; i++) {
            numList[i].textContent = i + 1
        }
    })
    // 编辑动作
    btnEdits[idx].addEventListener('click', function () {
        editObj = this.parentNode.parentNode
        showEditDialog()
    })
}

// 新建数据弹窗动作
//新建按钮
newBtn.addEventListener('click', showNewDialog)
//关闭按钮
btnNewClose.addEventListener('click', closeNewDialog)
//右上角叉掉
xNewClose.addEventListener('click', closeNewDialog)
//表单验证
// 获取新建数据弹窗的所有input框
var inputs = newDialogForm.getElementsByTagName('input');
// 为每个input框添加失去焦点事件
for (var i = 0; i < inputs.length; i++) {
    inputs[i].onblur = verifyInput;
}
// 获取新建数据弹窗的所有select框
var selects = newDialogForm.getElementsByTagName('select');
//为每个select框添加失去焦点事件
for (var j = 0; j < selects.length; j++) {
    selects[j].onblur = verifySelect;
}

//单个验证：该函数主要用于获取相应input元素的用户输入的内容进行检验，之后，把检验的结果显示在HTML页面中
function verifyInput() {
    // 获取输入框的id值、value值
    var id = this.id;
    var val = this.value;
    //去掉空格
    val = val.trim();
     //判断内容是否为空，显示提示信息
    if (!val) {
        this.parentNode.children[2].textContent = '输入不能为空！'
        return
    } else {
        //当用户添加内容后清除提示
        this.parentNode.children[2].textContent = ''
    }
    //手机号码：13、14、15、17、18开头的11位手机号。
    if (id === 'newPhone') {
        var reg = /^1[3456789]\d{9}$/;
        if (!reg.test(val)) {
            this.parentNode.children[2].textContent = '不符合格式！'
        } else {
            //当用户修改内容符合格式后清除提示
            this.parentNode.children[2].textContent = ''
        }
    }
}

//单个验证：该函数主要用于获取相应select元素的用户输入的内容进行检验，之后，把检验的结果显示在HTML页面中
function verifySelect() {
    // 获取输入框的value值
    var val = this.value;
    //去掉空格
    val = val.trim();
    //判断select选择框内容是否为空
    if (val === 'none') {
        this.parentNode.children[2].textContent = '输入不能为空！'
    } else {
        //当用户选择内容后清除提示
        this.parentNode.children[2].textContent = ''
    }
}

//保存按钮
btnNewSave.addEventListener('click', function () {
    //在提交表单数据前再次进行验证，避免有元素因为没有获取焦点而遗漏验证
    for (var i = 0; i < inputs.length; i++) {
        // 通过apply()方法可以设置 this 的值
        verifyInput.apply(inputs[i])
    }
    for (var j = 0; j < selects.length; j++) {
        verifySelect.apply(selects[j])
    }
    //判断验证结果是否全都正确
    var verifyList = document.querySelectorAll(".verify")
    for (var k = 0; k < verifyList.length; k++) {
        if (verifyList[k].textContent !== '') {
            alert("存在输入为空或者不正确的输入!")
            return
        }
    }
    num++
    recordTable.insertAdjacentHTML('beforeend', `<tr>
    <td>${num}</td>
    <td>${document.getElementById("newuserID").value}</td>
    <td>${document.getElementById("newusername").value}</td>
    <td>${document.getElementById("newName").value}</td>
    <td>${document.getElementById("newPhone").value}</td>
    <td>${document.getElementById("newState").value}</td>
    <td>${document.getElementById("newClerk").value}</td>
    <td>
        <button class="edit">编辑</button>
        <button class="delete">删除</button>
    </td>
	</tr>`)
    //关闭新建数据弹窗
    closeNewDialog()
    //给新增加的记录的按钮绑定点击事件
    //绑定删除按键事件
    recordTable.lastElementChild.querySelector('.delete').addEventListener('click', function () {
        num--
        recordTable.removeChild(this.parentNode.parentNode)
        var numList = document.querySelectorAll(".recordForm>tbody>tr>td:nth-child(1)")   //表格数据编号单元格列表
        //删除节点后编号重新排序
        for (var i = 0; i < numList.length; i++) {
            numList[i].textContent = i + 1
        }
    })
    //绑定编辑按键事件
    recordTable.lastElementChild.querySelector('.edit').addEventListener('click', function () {
        editObj = this.parentNode.parentNode
        showEditDialog()
    })
})

// 编辑数据弹窗动作
//关闭按钮
btnEditClose.addEventListener('click', closeEditDialog)
//右上角叉掉
xEditClose.addEventListener('click', closeEditDialog)
//保存按钮
btnEditSave.addEventListener('click', function () {
//修改合同编号
	if (document.getElementById("editContractNum").value !== '') {
        editObj.cells[1].innerText = document.getElementById("editContractNum").value
    }
    //修改公司名称
    if (document.getElementById("editCompany").value !== '') {
           editObj.cells[2].innerText = document.getElementById("editCompany").value
    }
    //修改联系人
    if (document.getElementById("editName").value !== '') {
        editObj.cells[3].innerText = document.getElementById("editName").value
    }
    //修改联系电话
    if (document.getElementById("editPhone").value !== '') {
        editObj.cells[4].innerText = document.getElementById("editPhone").value
    }
        //修改合同状态
    if (document.getElementById("editState").value !== '') {
        editObj.cells[6].innerText = document.getElementById("editState").value
    }
    //修改负责业务员
    if (document.getElementById("editClerk").value !== '') {
        editObj.cells[7].innerText = document.getElementById("editClerk").value
    }
    closeEditDialog()
})









