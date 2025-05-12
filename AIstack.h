#define MAX 100
typedef struct {
    char name[50];
    int math;        
    int chinese;     
    int dataStructure; 
    int network;     
    int total;       
    float average;   
} Student;

typedef struct {
    Student students[MAX];
    int top;
} Stack;


void initStack(Stack *s) {
    s->top = -1;
}


void push(Stack *s, const char *name, int math, int chinese, int ds, int net) {
    if (s->top == MAX - 1) {
        printf("Stack full.\n");
        return;
    }
    s->top++;
    strcpy(s->students[s->top].name, name);
    s->students[s->top].math = math;
    s->students[s->top].chinese = chinese;
    s->students[s->top].dataStructure = ds;
    s->students[s->top].network = net;
    
    s->students[s->top].total = math + chinese + ds + net;
    s->students[s->top].average = s->students[s->top].total / 4.0;
}


void pop(Stack *s) {
    if (s->top == -1) {
        printf("Stack empty.\n");
        return;
    }
    s->top--;
}


Student topStudent(Stack *s) {
    Student empty = {"", 0, 0, 0, 0, 0, 0.0};
    if (s->top == -1) {
        printf("Stack empty.\n");
        return empty;
    }
    return s->students[s->top];
}


void queryScore(Stack *s, const char *name) {
    int found = 0;
    for (int i = 0; i <= s->top; i++) {
        if (strcmp(s->students[i].name, name) == 0) {
            printf("学生: %s\n", s->students[i].name);
            printf("数学成绩: %d\n", s->students[i].math);
            printf("语文成绩: %d\n", s->students[i].chinese);
            printf("数据结构成绩: %d\n", s->students[i].dataStructure);
            printf("计算机网络成绩: %d\n", s->students[i].network);
            printf("总分: %d\n", s->students[i].total);
            printf("平均分: %.2f\n", s->students[i].average);
            found = 1;
            break;
        }
    }
    if (!found) {
        printf("未找到该学生信息。\n");
    }
}


void rankStudents(Stack *s) {
    if (s->top == -1) {
        printf("栈为空，没有学生信息。\n");
        return;
    }
    
    
    Student temp[MAX];
    for (int i = 0; i <= s->top; i++) {
        temp[i] = s->students[i];
    }
    
    
    int n = s->top + 1;
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (temp[j].total < temp[j + 1].total) {
                Student t = temp[j];
                temp[j] = temp[j + 1];
                temp[j + 1] = t;
            }
        }
    }
    
    
    printf("学生成绩排名:\n");
    printf("排名\t姓名\t数学\t语文\t数据结构\t计算机网络\t总分\t平均分\n");
    for (int i = 0; i < n; i++) {
        printf("%d\t%s\t%d\t%d\t%d\t\t%d\t\t%d\t%.2f\n", 
               i + 1, temp[i].name, temp[i].math, temp[i].chinese, 
               temp[i].dataStructure, temp[i].network, 
               temp[i].total, temp[i].average);
    }
}


void displayAll(Stack *s) {
    if (s->top == -1) {
        printf("栈为空，没有学生信息。\n");
        return;
    }
    
    printf("所有学生信息:\n");
    printf("序号\t姓名\t数学\t语文\t数据结构\t计算机网络\t总分\t平均分\n");
    for (int i = 0; i <= s->top; i++) {
        printf("%d\t%s\t%d\t%d\t%d\t\t%d\t\t%d\t%.2f\n", 
               i + 1, s->students[i].name, s->students[i].math, 
               s->students[i].chinese, s->students[i].dataStructure, 
               s->students[i].network, s->students[i].total, 
               s->students[i].average);
    }
}