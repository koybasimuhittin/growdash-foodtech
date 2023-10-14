import random
import matplotlib.pyplot as plt
import json
list1 = []

def dateList(x):
    tempList = []
    for i in range(x):
        tempList.append(i+1)
    return tempList

def timeList():
    tempList = []
    for i in range(16):
        tempList.append(i+1)
    return tempList

def numberOfSalesForADayListForDinner(timeList):
    tempList = []
    for i in timeList:
        if 1 <= i <= 2 : #Kahvaltı
            tempList.append(random.randint(1, 2))
        elif 3 <= i <= 4:
            tempList.append(random.randint(1,2))
        elif 5 <= i <= 6: #Öğle Yemeği
            tempList.append(random.randint(8, 12))
        elif 7 <= i <= 9:
            tempList.append(random.randint(2, 4))
        elif 10 <= i <= 11: #Akşam Yemeği
            tempList.append(random.randint(8, 12))
        else:
            tempList.append(random.randint(2, 6))
    return tempList

def numberOfSalesForADayListForBreakfast(timeList):
    tempList = []
    for i in timeList:
        if 1 <= i <= 2 : #Kahvaltı
            tempList.append(random.randint(8, 12))
        elif 3 <= i <= 4:
            tempList.append(random.randint(6, 10))
        elif 5 <= i <= 6: #Öğle Yemeği
            tempList.append(random.randint(4, 8))
        elif 7 <= i <= 9:
            tempList.append(random.randint(1, 4))
        elif 10 <= i <= 11: #Akşam Yemeği
            tempList.append(random.randint(1, 3))
        else:
            tempList.append(random.randint(1, 2))
    return tempList


testList = numberOfSalesForADayListForDinner(timeList())
print(testList)
testList2 = numberOfSalesForADayListForDinner(timeList())
print(testList2)
testList3 = numberOfSalesForADayListForBreakfast(timeList())
print(testList3)

def itemListForDinner():
    tempList = []
    for i in range(30):
        tempList.append(numberOfSalesForADayListForDinner(timeList()))
    return tempList

def itemListForBreakfast():
    tempList = []
    for i in range(30):
        tempList.append(numberOfSalesForADayListForBreakfast(timeList()))
    return tempList

item1 = itemListForDinner()
item2 = itemListForDinner()
item3 = itemListForBreakfast()
items = []
items.append(item1)
items.append(item2)
items.append(item3)
print(items)

with open("items.json", "w") as outfile:
    json.dump(items, outfile)


"""
# x axis values
x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
# corresponding y axis values
y = testList

# plotting the points
plt.plot(x, y, color='green', linestyle='dashed', linewidth=2,
         marker='o', markerfacecolor='blue', markersize=8)

# setting x and y axis range
plt.ylim(1, 12)
plt.xlim(1, 16)

# naming the x axis
plt.xlabel('x - axis')
# naming the y axis
plt.ylabel('y - axis')

# giving a title to my graph
plt.title('Some cool customizations!')

# function to show the plot
plt.show()

"""