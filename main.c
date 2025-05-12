#include<stdio.h>
#include<stdlib.h>
#include <string.h>
#include"AIstack.h"
int main() {
    Stack st;
    initStack(&st);
    

    push(&st, "张三", 90, 85, 88, 92);
    push(&st, "李四", 88, 92, 76, 89);
    push(&st, "王五", 76, 89, 96, 91);
    push(&st, "赵六", 95, 91, 85, 94);
    
    
    displayAll(&st);
    
    
    printf("\n查询张三的成绩:\n");
    queryScore(&st, "张三");
    
    
    printf("\n学生成绩排名:\n");
    rankStudents(&st);
    
    return 0;
}


