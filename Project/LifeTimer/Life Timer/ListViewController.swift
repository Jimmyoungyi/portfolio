//
//  ViewController.swift
//  Life Timer
//
//  Created by yangjianyi on 16/4/30.
//  Copyright © 2016年 yangjianyi. All rights reserved.
//

import UIKit

class ListViewController: UIViewController
{
    @IBOutlet weak var table: UITableView!
    
    override func viewWillAppear(animated: Bool) {
        table.reloadData()
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

}
extension ListViewController:UITableViewDataSource
{
    func tableView(tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
        let  headerCell = tableView.dequeueReusableCellWithIdentifier("headerCell") as! ListHeaderTableViewCell
        let hue = 1 / CGFloat(DataManager.sharedInstance.sectionList.count) * CGFloat(section)
        headerCell.backgroundColor = UIColor.init(hue: hue, saturation: 0.75, brightness: 0.75, alpha: 1)
        headerCell.title.text = DataManager.sharedInstance.list[section].name!
        headerCell.current = section
        return headerCell
    }
    func tableView(tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        return 50.00
    }
    
    func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        return DataManager.sharedInstance.list.count
    }
    
    func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCellWithIdentifier("listCell")!
        cell.textLabel?.text = DataManager.sharedInstance.sectionList[indexPath.section][indexPath.row].name
        return cell
    }
    
    func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return DataManager.sharedInstance.sectionList[section].count
    }
}
extension ListViewController:UITableViewDelegate{
    func tableView(tableView: UITableView, editActionsForRowAtIndexPath indexPath: NSIndexPath) -> [UITableViewRowAction]? {

        let delete = UITableViewRowAction(style: .Default, title: "delete") { (action: UITableViewRowAction, indexPath: NSIndexPath) -> Void in
            DataManager.sharedInstance.deleteItemAtSectionIndex(indexPath.section, index: indexPath.row)
            tableView.deleteRowsAtIndexPaths([indexPath], withRowAnimation: UITableViewRowAnimation.Left)
            }
        return [delete]
    }
}
