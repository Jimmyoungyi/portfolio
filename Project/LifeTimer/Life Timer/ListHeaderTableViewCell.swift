//
//  ListHeaderTableViewCell.swift
//  Time_Manager
//
//  Created by yangjianyi on 16/4/28.
//  Copyright © 2016年 yangjianyi. All rights reserved.
//

import UIKit

class ListHeaderTableViewCell: UITableViewCell {
    @IBOutlet weak var title: UILabel!
    var current = -1
    @IBAction func delectsection(sender: UIButton) {
        DataManager.sharedInstance.deleteListAtIndex(current)
        
        print(current)
    }

    //@IBOutlet weak var sectionName: UILabel!
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

}
