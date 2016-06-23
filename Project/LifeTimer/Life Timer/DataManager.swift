//
//  DataManager.swift
//  Time_Manager
//
//  Created by yangjianyi on 16/4/29.
//  Copyright © 2016年 yangjianyi. All rights reserved.
//

import Foundation
import CoreData
import UIKit



class DataManager{
    static let sharedInstance = DataManager()
    var list = [List]()
    var items = [Item]()
    var sectionList = [[Item]]()

    var context: NSManagedObjectContext!

    init(){
        let appDelegate = UIApplication.sharedApplication().delegate as! AppDelegate
        context = appDelegate.managedObjectContext
        fetchTodos()
    }

    func fetchTodos(){
        let listRequest = NSFetchRequest(entityName: "List")
        do{
            let results = try context.executeFetchRequest(listRequest)
            list = results as! [List]
        }catch let error{
            print("fetch error\(error)")
        }
        
        let itemRequest = NSFetchRequest(entityName: "Item")
        do{
            let results = try context.executeFetchRequest(itemRequest)
            items = results as! [Item]
        }catch let error{
            print("fetch error\(error)")
        }
        
        for section in list{
            var sectionitem = [Item]()
            for item in items{
                if section.name == item.section{
                    sectionitem.append(item)
                }
            }
            sectionList.append(sectionitem)
        }
    }
    
    func addNewSectionWithName(name: String){
        let item = NSEntityDescription.insertNewObjectForEntityForName("List", inManagedObjectContext: context) as! List
        item.name = name
        list.append(item)
        sectionList.append([Item]())
        save()
    }
    
    func getSectionByName(name:String) -> Int{
        var i = 0
        for item in list{
            if item.name == name {
                break
            }
            i += 1
        }
        return i
    }
    
    func addNewItemWithName(name:String, section:String){
        let item = NSEntityDescription.insertNewObjectForEntityForName("Item", inManagedObjectContext: context) as! Item
        item.name = name
        item.section = section
        sectionList[getSectionByName(section)].append(item)
        save()
    }
    
    
    func listAtIndex(index: Int) -> List {
        return list[index]
    }
    func itemAtSectionIndex(section:Int, index:Int)->Item{
        return sectionList[section][index]
    }

    func deleteItemAtSectionIndex(section:Int, index:Int){
        context.deleteObject(itemAtSectionIndex(section, index: index))
        sectionList[section].removeAtIndex(index)
        save()
    }

    func deleteListAtIndex(index: Int){
        
        for item in sectionList[index]{
            context.deleteObject(item)
        }
        sectionList.removeAtIndex(index)
        context.deleteObject(listAtIndex(index))
        list.removeAtIndex(index)
        save()
    }
    
    
    func save(){
        do{
            try context.save()
        }catch let error{
            print("save error\(error)")
        }
    }
}