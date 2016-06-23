//
//  AddItemViewController.swift
//  Life Timer
//
//  Created by yangjianyi on 16/5/5.
//  Copyright © 2016年 yangjianyi. All rights reserved.
//

import UIKit

class AddItemViewController: UIViewController {

    
    @IBOutlet weak var this: UILabel!
    @IBOutlet weak var iteminput: UITextField!
    
    @IBOutlet weak var sectioninput: UITextField!
    @IBAction func sectionnameinput(sender: AnyObject) {
        if sectioninput.text != ""{
            iteminput.enabled = true
            sectionname = sectioninput.text
            this.text = "Add New Iten To \(sectionname!)"
        }else{
            iteminput.enabled = false
        }
    }
    @IBOutlet weak var itemNameText: UITextField!
    
    var newItem = false
    var sectionname:String?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        sectioninput.enabled = false
        iteminput.enabled = false
        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    @IBAction func save(sender: UIBarButtonItem) {
        if let section:String = sectionname{
            if let item:String = itemNameText.text{
                if newItem{
                    DataManager.sharedInstance.addNewSectionWithName(section)
                }
                DataManager.sharedInstance.addNewItemWithName(item, section: section)
            }
        }
        navigationController?.popToRootViewControllerAnimated(true)
    }

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}

extension AddItemViewController:UIPickerViewDataSource{

    func numberOfComponentsInPickerView(pickerView: UIPickerView) -> Int {
        return 1
    }
    func pickerView(pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
        return DataManager.sharedInstance.list.count+2
    }
    func pickerView(pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
        if row==0 {
            return "select a section"
        }else if row-1 < DataManager.sharedInstance.list.count {
            return DataManager.sharedInstance.list[row-1].name
        }else{
            return "new section"
        }
    }
}
extension AddItemViewController:UIPickerViewDelegate{
    func pickerView(pickerView: UIPickerView, didSelectRow row: Int, inComponent component: Int) {
        if row==0{
            this.text = "Select a Section"
            newItem = false
            sectioninput.text = ""
            sectioninput.enabled = false
            iteminput.enabled = false
        }else if row == DataManager.sharedInstance.list.count+1{
            this.text = "Add New Iten To "
            newItem = true
            sectioninput.focused
            sectioninput.enabled = true
        }else{
            newItem = false
            sectioninput.text = ""
            sectionname = DataManager.sharedInstance.list[row-1].name
            sectioninput.enabled = false
            this.text = "Add New Iten To \(sectionname!)"
            iteminput.enabled = true
        }
    }
}